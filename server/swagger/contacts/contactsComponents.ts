export const contactsComponents = {
  ContactsRequest: {
    type: "object",
    properties: {
      address: {
        type: "string",
      },
      phoneNumber: {
        type: "string",
      },
      email: {
        type: "string",
      },
      facebookLink: {
        type: "string",
      },
      instagramLink: {
        type: "string",
      },
    },
  },
  ContactsResponse: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      language: {
        type: "string",
      },
      address: {
        type: "string",
      },
      phoneNumber: {
        type: "string",
      },
      email: {
        type: "string",
      },
      facebookLink: {
        type: "string",
      },
      instagramLink: {
        type: "string",
      },
    },
  },
};
