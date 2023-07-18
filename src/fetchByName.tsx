import { Detail, Toast, getPreferenceValues, showToast, ActionPanel, Action } from "@raycast/api";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { ValInfo } from "./types";
import { buildExpressEndpoint, buildRunEndpoint, buildValtownURL, codeblock } from "./utils";

const { apiToken } = getPreferenceValues();

export default function Val(props: { arguments: Arguments.FetchByName }) {
  const [markdown, setMarkdown] = useState<string>();

  const valInfo: ValInfo = { valname: props.arguments.valname, username: props.arguments.user };
  const valtownURL = buildValtownURL(valInfo);
  const runEndpoint = buildRunEndpoint(valInfo);
  const expressEndpoint = buildExpressEndpoint(valInfo);

  let status: number;
  useEffect(() => {
    fetch(`https://api.val.town/v1/alias/${props.arguments.user}/${props.arguments.valname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiToken,
      },
    })
      .then((res) => {
        status = res.status;
        console.log("" + status);
        if (status === 200) {
          return res.json();
        }
        return res.text();
      })
      .then((json) => {
        if (status === 200) {
          setMarkdown(codeblock(JSON.stringify(json, null, 2), "json"));
        } else {
          setMarkdown(String(json));
        }
      })
      .catch((err) => {
        showToast(Toast.Style.Failure, "Error", err);
      });
  }, []);

  return (
    <Detail
      isLoading={typeof markdown == "undefined"}
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open on Val Town" url={valtownURL} />
          <Action.CopyToClipboard title="Copy Run Endpoint" content={runEndpoint} />
          <Action.OpenInBrowser title="Open Run Endpoint" url={runEndpoint} />
          <Action.CopyToClipboard title="Copy Express Endpoint" content={expressEndpoint} />
          <Action.OpenInBrowser title="Open Express Endpoint" url={expressEndpoint} />
        </ActionPanel>
      }
    />
  );
}
