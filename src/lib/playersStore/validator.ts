import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    players: {
      type: "object",
      properties: {
        "06029833-d190-4434-8339-dd11431eb2b6": {
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
      required: ["06029833-d190-4434-8339-dd11431eb2b6"],
    },
    currentTurn: {
      type: "null",
    },
    roundNumber: {
      type: "null",
    },
  },
  required: ["players", "currentTurn", "roundNumber"],
};

export default function validatePlayersStore(data) : boolean {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);

  return valid as boolean;
}
