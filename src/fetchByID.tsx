import { Detail, Toast, getPreferenceValues, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import createActionPanel from "./ActionPanel";
import { ValInfo } from "./types";
import { buildExpressEndpoint, buildRunEndpoint, buildValtownURL, codeblock } from "./utils";

const { apiToken } = getPreferenceValues();

const id = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export default function Command(props: { arguments: Arguments.FetchByID }) {
  const [jsonData, setJsonData] = useState<any>();
  const [valInfo, setValInfo] = useState<ValInfo>({ valname: "", username: "" });

  if (!id.test(props.arguments.valid)) {
    showToast(Toast.Style.Failure, "Not a valid ID");
    return;
  }
  const { isLoading, data, revalidate } = useFetch(`https://api.val.town/v1/vals/${props.arguments.valid}`, {
    headers: {
      Accept: "Bearer" + apiToken,
    },
    onError: (error) => {
      console.error(error);
      let markdown = "";
      showToast(Toast.Style.Failure, "Sorry, that Val could not found.");
    },
  });

  useEffect(() => {
    setJsonData(data);
  }, [data]);

  useEffect(() => {
    if (jsonData && typeof jsonData === "object") {
      const { author, name } = jsonData;
      setValInfo({ valname: name, username: author?.username });
    }
  }, [jsonData]);

  let markdown = jsonData ? codeblock(JSON.stringify(jsonData, null, 2), "json") : undefined;

  const valtownURL = buildValtownURL(valInfo);
  const runEndpoint = buildRunEndpoint(valInfo);
  const expressEndpoint = buildExpressEndpoint(valInfo);

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={createActionPanel(valtownURL, runEndpoint, expressEndpoint)}
    />
  );
}
