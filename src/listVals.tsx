import { LaunchProps, List } from "@raycast/api";

const baseItems = ["vigorous-velocity", "cyan-centauri", "tidal-twilight", "second-sphere"];

export default function Command(props: LaunchProps) {
  const username = props.arguments.username || "nbbaier";
  const items = baseItems.map((item) => {
    return `@${username}.${item}`;
  });
  return (
    <List navigationTitle="Search Beers" searchBarPlaceholder="Search your favorite beer">
      {items.map((item, i) => (
        <List.Item key={i} title={item} />
      ))}
    </List>
  );
}
