import { Action, ActionPanel, Detail, Toast, getPreferenceValues, showToast } from "@raycast/api";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { ValInfo } from "./types";
import { buildExpressEndpoint, buildRunEndpoint, codeblock } from "./utils";

const { apiToken } = getPreferenceValues();

export default function Val(props: { arguments: Arguments.FetchByID }) {
  const [jsonData, setJsonData] = useState<any>();
  const [valInfo, setValInfo] = useState<ValInfo>({ valname: "", username: "" });

  let status: number;
  useEffect(() => {
    fetch(`https://api.val.town/v1/vals/${props.arguments.valid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiToken,
      },
    })
      .then((res) => {
        status = res.status;
        if (status === 200) {
          return res.json();
        }
        return res.text();
      })
      .then((json) => {
        setJsonData(json);
      })
      .catch((err) => {
        showToast(Toast.Style.Failure, "Error", err);
      });
  }, []);

  useEffect(() => {
    if (jsonData && typeof jsonData === "object") {
      const { author, name } = jsonData;
      setValInfo({ valname: name, username: author?.username });
    }
  }, [jsonData]);

  const markdown = jsonData ? codeblock(JSON.stringify(jsonData, null, 2), "json") : undefined;

  const runEndpoint = buildRunEndpoint(valInfo);
  const expressEndpoint = buildExpressEndpoint(valInfo);

  return (
    <Detail
      isLoading={typeof markdown == "undefined"}
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Run Endpoint" content={runEndpoint} />
          <Action.OpenInBrowser title="Open Run Endpoint" url={runEndpoint} />
          <Action.CopyToClipboard title="Copy Express Endpoint" content={expressEndpoint} />
          <Action.OpenInBrowser title="Open Express Endpoint" url={expressEndpoint} />
        </ActionPanel>
      }
    />
  );
}
