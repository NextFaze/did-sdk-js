import { PrivateKey } from "@hashgraph/sdk";
import { DidError, Hashing, HcsDidCreateVerificationMethodEvent, HcsDidEventTargetName } from "../../../../dist";

describe("HcsDidCreateVerificationMethodEvent", () => {
    const privateKey = PrivateKey.fromString(
        "302e020100300506032b6570042204209044d8f201e4b0aa7ba8ed577b0334b8cb6e38aad6c596171b5b1246737f5079"
    );
    const identifier = `did:hedera:testnet:${Hashing.multibase.encode(privateKey.publicKey.toBytes())}_0.0.29613327`;
    const event = new HcsDidCreateVerificationMethodEvent(
        identifier + "#key-1",
        "Ed25519VerificationKey2018",
        identifier,
        privateKey.publicKey
    );

    describe("#constructor", () => {
        it("targets verificationMethod", () => {
            expect(event.targetName).toEqual(HcsDidEventTargetName.VERIFICATION_METHOD);
        });

        it("throws error if id is null", () => {
            let error = null;
            try {
                new HcsDidCreateVerificationMethodEvent(
                    null,
                    "Ed25519VerificationKey2018",
                    identifier,
                    privateKey.publicKey
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Verification Method args are missing");
        });

        it("throws error if type is null", () => {
            let error = null;
            try {
                new HcsDidCreateVerificationMethodEvent(identifier + "#key-1", null, identifier, privateKey.publicKey);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Verification Method args are missing");
        });

        it("throws error if controller is null", () => {
            let error = null;
            try {
                new HcsDidCreateVerificationMethodEvent(
                    identifier + "#key-1",
                    "Ed25519VerificationKey2018",
                    null,
                    privateKey.publicKey
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Verification Method args are missing");
        });

        it("throws error if publicKey is null", () => {
            let error = null;
            try {
                new HcsDidCreateVerificationMethodEvent(
                    identifier + "#key-1",
                    "Ed25519VerificationKey2018",
                    identifier,
                    null
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Verification Method args are missing");
        });

        it("throws error if id is not valid", () => {
            let error = null;
            try {
                new HcsDidCreateVerificationMethodEvent(
                    identifier,
                    "Ed25519VerificationKey2018",
                    identifier,
                    privateKey.publicKey
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Event ID is invalid. Expected format: {did}#key-{integer}");
        });
    });

    describe("#getId", () => {
        it("returns id passed via constructor", () => {
            expect(event.getId()).toEqual(
                "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327#key-1"
            );
        });
    });

    describe("#getType", () => {
        it("returns type passed via constructor", () => {
            expect(event.getType()).toEqual("Ed25519VerificationKey2018");
        });
    });

    describe("#getController", () => {
        it("returns type passed via constructor", () => {
            expect(event.getController()).toEqual(
                "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327"
            );
        });
    });

    describe("#getPublicKey", () => {
        it("returns public key passed via constructor", () => {
            expect(event.getPublicKey()).toEqual(privateKey.publicKey);
        });
    });

    describe("#getPublicKeyMultibase", () => {
        it("returns public key base58 encoded", () => {
            expect(event.getPublicKeyMultibase()).toEqual("z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa");
        });
    });

    describe("#getBase64", () => {
        it("returns event data encoded in base64", () => {
            expect(event.getBase64()).toEqual(
                "eyJWZXJpZmljYXRpb25NZXRob2QiOnsiaWQiOiJkaWQ6aGVkZXJhOnRlc3RuZXQ6ejZNa29nVnpvR0pNVlZMaGF6ODJjQTVqWlFLQUFxVWdoaENycHprU0RGRHd4ZkphXzAuMC4yOTYxMzMyNyNrZXktMSIsInR5cGUiOiJFZDI1NTE5VmVyaWZpY2F0aW9uS2V5MjAxOCIsImNvbnRyb2xsZXIiOiJkaWQ6aGVkZXJhOnRlc3RuZXQ6ejZNa29nVnpvR0pNVlZMaGF6ODJjQTVqWlFLQUFxVWdoaENycHprU0RGRHd4ZkphXzAuMC4yOTYxMzMyNyIsInB1YmxpY0tleU11bHRpYmFzZSI6Ino2TWtvZ1Z6b0dKTVZWTGhhejgyY0E1alpRS0FBcVVnaGhDcnB6a1NERkR3eGZKYSJ9fQ=="
            );
        });
    });

    describe("#toJsonTree", () => {
        it("returns event JSON structure", () => {
            expect(event.toJsonTree()).toEqual({
                VerificationMethod: {
                    controller: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327",
                    id: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327#key-1",
                    publicKeyMultibase: "z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa",
                    type: "Ed25519VerificationKey2018",
                },
            });
        });
    });

    describe("#toJSON", () => {
        it("returns stringified JSON structure version", () => {
            expect(event.toJSON()).toEqual(
                '{"VerificationMethod":{"id":"did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327#key-1","type":"Ed25519VerificationKey2018","controller":"did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327","publicKeyMultibase":"z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa"}}'
            );
        });
    });

    describe("#fromJsonTree", () => {
        it("rebuilds HcsDidCreateVerificationMethodEvent object", () => {
            const eventFromJson = HcsDidCreateVerificationMethodEvent.fromJsonTree({
                controller: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327",
                id: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327#key-1",
                publicKeyMultibase: "z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa",
                type: "Ed25519VerificationKey2018",
            });

            expect(eventFromJson).toBeInstanceOf(HcsDidCreateVerificationMethodEvent);
            expect(eventFromJson.toJsonTree()).toEqual({
                VerificationMethod: {
                    controller: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327",
                    id: "did:hedera:testnet:z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa_0.0.29613327#key-1",
                    publicKeyMultibase: "z6MkogVzoGJMVVLhaz82cA5jZQKAAqUghhCrpzkSDFDwxfJa",
                    type: "Ed25519VerificationKey2018",
                },
            });
        });
    });
});