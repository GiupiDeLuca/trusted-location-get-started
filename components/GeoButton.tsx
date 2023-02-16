import { useSignMessage, useAccount } from "wagmi";
import { useRef, useState } from "react";
import { ConnectButton } from "./ConnectButton";
import { GeolocationVerifier } from "@w3bstream/geolocation-light";

const locationObject = {
    latitude: 40.343536, 
    longitude: -60.635364, 
    distance: 100, 
    from: new Date("2023-01-03").getTime(), 
    to: new Date("2023-01-28").getTime()
}

export const GeoButton = () => {

    const geolocation = useRef<GeolocationVerifier>(new GeolocationVerifier());

    const { address, isConnected } = useAccount();

    const [verificationSuccessful, setVerificationSuccessful] = useState(false);
 
    const { signMessage } = useSignMessage({
        onSuccess: async (data) => {
            geolocation.current.signature = data;
            sendQuery()
        },
    });
    
    async function sendQuery() {
        const verifiedLocations = await geolocation.current.verifyLocation();
        if (!!verifiedLocations && verifiedLocations.length > 0) {
            setVerificationSuccessful(true);
        } else {
            setVerificationSuccessful(false);
        }
    }

    function handleQuery() {
        if (!address) return;

        geolocation.current.location = (locationObject)

        const message = geolocation.current.generateSiweMessage({
            address,
            domain: globalThis.location.host,
            uri: globalThis.location.origin,
        });
        signMessage({ message });
    }

    if (!isConnected) {
        return <ConnectButton />;
    }

    return (
        <div>
            <p>
                {address}
            </p>
            <button
                onClick={handleQuery}>
                Send Query
            </button>
            <p>
                {
                    verificationSuccessful ?
                        `Valid Proof` : `No Proof Returned`
                }
            </p>

        </div>
    )    

}