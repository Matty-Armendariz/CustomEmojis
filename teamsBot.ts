import { default as axios } from "axios";
import { getEmoji } from "./DBconnection"
import * as querystring from "querystring";
import { TeamsActivityHandler, CardFactory, CardImage, TurnContext, MessagingExtensionQuery, MessagingExtensionResponse } from "botbuilder";

export interface DataInterface {
  likeCount: number;
}

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }

  // Message extension Code
  // Search.
  public async handleTeamsMessagingExtensionQuery(
    context: TurnContext,
    query: MessagingExtensionQuery
  ): Promise<MessagingExtensionResponse> {
    const searchQuery = query.parameters[0].value;
    const response = getEmoji(searchQuery);

    const attachments = [response[0].name];

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
  }

  public async handleTeamsMessagingExtensionSelectItem(
    context: TurnContext,
    obj: any
  ): Promise<MessagingExtensionResponse> {
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [CardFactory.heroCard(obj.name, obj.description)],
      },
    };
  }
}
