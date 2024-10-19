import { PageWrapper } from "@components";
import { homePageName } from "@constants";
import { Dashboard } from "./Home.styles";
import {
  MovieWinnersCard,
  MultipleWinnersCard,
  ProducersWithIntervalCard,
  StudiosCard,
} from "./sub-components";

export const Home = () => {
  return (
    <PageWrapper pageTitle={homePageName}>
      <Dashboard>
        <MultipleWinnersCard />
        <StudiosCard />
        <ProducersWithIntervalCard />
        <MovieWinnersCard />
      </Dashboard>
    </PageWrapper>
  );
};
