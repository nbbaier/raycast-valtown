import { Action, ActionPanel } from "@raycast/api";

export default function createActionPanel(openURL: string, runURL: string, expressURL: string) {
  return (
    <ActionPanel>
      <Action.OpenInBrowser title="Open on Val Town" url={openURL} />
      <Action.CopyToClipboard title="Copy Run Endpoint" content={runURL} />
      <Action.OpenInBrowser title="Open Run Endpoint" url={runURL} />
      <Action.CopyToClipboard title="Copy Express Endpoint" content={expressURL} />
      <Action.OpenInBrowser title="Open Express Endpoint" url={expressURL} />
    </ActionPanel>
  );
}
