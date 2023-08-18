export type RootHydrateFunction = (
  vode: VNode<Node, Element>,
  container: (Element | ShadowRoot) & { _vode?: VNode }
) => void
