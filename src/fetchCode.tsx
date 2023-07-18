import { Detail, Toast, getPreferenceValues, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import createActionPanel from "./ActionPanel";
import { ValInfo } from "./types";
import { buildExpressEndpoint, buildRunEndpoint, buildValtownURL, codeblock } from "./utils";

const { apiToken } = getPreferenceValues();

export default function Command(props: { arguments: Arguments.FetchCode }) {
  const valInfo: ValInfo = {
    valname: props.arguments.valname.split(".")[1],
    username: props.arguments.valname.split(".")[0].startsWith("@")
      ? props.arguments.valname.split(".")[0].substring(1)
      : props.arguments.valname.split(".")[0],
  };

  const valtownURL = buildValtownURL(valInfo);
  const runEndpoint = buildRunEndpoint(valInfo);
  const expressEndpoint = buildExpressEndpoint(valInfo);

  const [markdown, setMarkdown] = useState<string>();

  const { isLoading, data, revalidate } = useFetch(
    `https://api.val.town/v1/alias/${valInfo.username}/${valInfo.valname}`,
    {
      headers: {
        Accept: "Bearer" + apiToken,
      },
      onError: (error) => {
        console.error(error);
        setMarkdown("");
        showToast(Toast.Style.Failure, "Sorry, that Val could not found.");
      },
    }
  );

  useEffect(() => {
    //@ts-ignore
    setMarkdown(codeblock(data.code, "ts"));
  }, [data]);

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={createActionPanel(valtownURL, runEndpoint, expressEndpoint)}
    />
  );
}
