import Irys from "../src/node/irys";
import { clientKeys } from "./utils"; // change this to your keyfile

const Irys_DEVNET_URL = "https://devnet.Irys.network/";

jest.setTimeout(20000);

// for each token to test, include here the precalculated public key
const publicKeys = {
  arweave: clientKeys.arweave.key.n,
  ethereum: "04f446c3897dbf19753b6050c2a06201aa55a59c185d3dd04c0746b32c8992540bd95c9966b07458739248d2919c125f2c1d422cb7743245c58c50ce9b5a03fb0e",
  solana: "350efd4780e5cd4b9c0d45709f7c48e93a3d31a1fa77a3f57c2bd8096688c243",
  algorand: "5d2c5fdf0721ed58e663610d7aef09ad47e9eef07a0d071594ec08e77b0cd542",
  near: clientKeys.near.address,
  aptos: clientKeys.aptos.address,
};

const hexEncodedCurrencies = ["ethereum", "aptos"];

describe.each(Object.keys(publicKeys))("given we use %s", (keyName) => {
  let Irys: Irys;

  beforeAll(async () => {
    const { key, providerUrl } = clientKeys[keyName];
    Irys = new Irys(Irys_DEVNET_URL, keyName, key, providerUrl ?? { providerUrl });
    await Irys.ready();
  });

  describe("Irys.tokenConfig.getPublicKey", () => {
    it("should return the public key", () => {
      const publicKey = Irys.tokenConfig.getPublicKey();
      expect(publicKey.toString("hex")).toBe(publicKeys[keyName]);
    });
  });

  describe("Irys.tokenConfig.ownerToAddress", () => {
    it("should return the address", () => {
      const publicKey = Irys.tokenConfig.getPublicKey();
      const address = Irys.tokenConfig.ownerToAddress(publicKey);

      // aptos and ethereum addresses are hex and thus case insensitive
      if (hexEncodedCurrencies.includes(keyName)) expect(address.toLowerCase()).toBe(clientKeys[keyName].address.toLowerCase());
      else expect(address).toBe(clientKeys[keyName].address);
    });
  });
});
