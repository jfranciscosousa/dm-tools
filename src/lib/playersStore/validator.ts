import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    players: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          initiative: {
            type: "integer",
          },
        },
        required: ["id", "name", "initiative"],
      },
    },
    currentTurn: {
      type: ["integer", "null"],
    },
    roundNumber: {
      type: ["integer", "null"],
    },
  },
  required: ["players"],
};

export default function validatePlayersStore(data): boolean {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);

  return valid as boolean;
}
