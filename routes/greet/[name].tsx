import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return <div>Hi, Hello {props.params.name}</div>;
}
