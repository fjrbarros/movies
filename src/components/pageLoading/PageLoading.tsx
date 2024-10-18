import { ContentLoading, Cube, CubeGrid } from "./PageLoading.styles";

export const PageLoading = () => {
  const animationDelays = [
    "0.2s",
    "0.3s",
    "0.4s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0s",
    "0.1s",
    "0.2s",
  ];

  return (
    <ContentLoading data-testid="content-loading">
      <CubeGrid>
        {animationDelays.map((delay, index) => (
          <Cube
            key={`${delay}-${index}`}
            data-testid="cube"
            style={{ animationDelay: delay }}
          />
        ))}
      </CubeGrid>
    </ContentLoading>
  );
};
