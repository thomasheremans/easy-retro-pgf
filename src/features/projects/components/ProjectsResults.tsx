import clsx from "clsx";
import Link from "next/link";

import { InfiniteLoading } from "~/components/InfiniteLoading";
import { useRoundState } from "~/features/rounds/hooks/useRoundState";
import { useProjectsResults, useResults } from "~/hooks/useResults";
import { ProjectItem, ProjectItemAwarded } from "./ProjectItem";
import { useCurrentDomain } from "~/features/rounds/hooks/useRound";

export function ProjectsResults() {
  const projects = useProjectsResults();
  const results = useResults();
  const domain = useCurrentDomain();

  const roundState = useRoundState();
  return (
    <InfiniteLoading
      {...projects}
      renderItem={(item, { isLoading }) => {
        return (
          <Link
            key={item.id}
            href={`/${domain}/projects/${item.id}`}
            className={clsx("relative", { ["animate-pulse"]: isLoading })}
          >
            {!results.isPending && roundState === "RESULTS" ? (
              <ProjectItemAwarded
                amount={results.data?.projects?.[item.id]?.votes}
              />
            ) : null}
            <ProjectItem isLoading={isLoading} attestation={item} />
          </Link>
        );
      }}
    />
  );
}
