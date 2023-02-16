import { useConnect } from "wagmi";

export const ConnectButton = () => {
  const { connect, connectors } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect
        </button>
      ))}
    </div>
  );
};