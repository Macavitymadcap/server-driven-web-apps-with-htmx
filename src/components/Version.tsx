export const Version = () => {
  return (
    <>
      <div class="flex-column">
        <h3>{`v${Bun.version}`}</h3>
        <img
          src="/assets/bun.png"
          alt="Bun Logo"
          class="bun-logo"
          height="210"
          width="240"
        />
      </div>
    </>
  );
};
