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
    const response = await getEmoji(searchQuery);
    const attachments = [];
    
    const heroCard = CardFactory.heroCard(response.name, [response.url]);
    const preview = CardFactory.heroCard(response.name, [response.url]);
    preview.content.tap = {
      type: "invoke",
      value: { name: response.name, images: [response.url] }
    };
    const attachment = { ...heroCard, preview };
    attachments.push(attachment);

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
        attachments: [CardFactory.thumbnailCard('', obj.images)],
      },
    };
  }
}
