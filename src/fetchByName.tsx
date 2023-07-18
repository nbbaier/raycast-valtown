import { Action, ActionPanel, Detail, Toast, getPreferenceValues, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { ValInfo } from "./types";
import { buildExpressEndpoint, buildRunEndpoint, buildValtownURL, codeblock } from "./utils";
import createActionPanel from "./ActionPanel";

const { apiToken, username } = getPreferenceValues();

export default function Command(props: { arguments: Arguments.FetchByName }) {
  let valInfo: ValInfo;
  if (props.arguments.valname.includes(".")) {
    valInfo = {
      valname: props.arguments.valname.split(".")[1],
      username: props.arguments.valname.split(".")[0].startsWith("@")
        ? props.arguments.valname.split(".")[0].substring(1)
        : props.arguments.valname.split(".")[0],
    };
  } else {
    valInfo = {
      valname: props.arguments.valname,
      username: username,
    };
  }

  const valtownURL = buildValtownURL(valInfo);
  const runEndpoint = buildRunEndpoint(valInfo);
  const expressEndpoint = buildExpressEndpoint(valInfo);

  const [markdown, setMarkdown] = useState<string>("");

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

    setMarkdown(codeblock(JSON.stringify(data, null, 2), "json"));
  }, [data]);

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={createActionPanel(valtownURL, runEndpoint, expressEndpoint)}
      // metadata={
      //   <Detail.Metadata>
      //     {/* @ts-ignore */}
      //     <Detail.Metadata.Label title="Author" text={data.author.username} />
      //     {/* @ts-ignore */}
      //     <Detail.Metadata.Label title="Name" text={data.name} />
      //   </Detail.Metadata>
      // }
    />
  );
}
