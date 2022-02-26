import { DragoniteCommand } from '#lib/extensions/DragoniteCommand';
import { getGuildIds } from '#utils/utils';
import { ApplyOptions } from '@sapphire/decorators';
import type { ChatInputCommand } from '@sapphire/framework';

@ApplyOptions<ChatInputCommand.Options>({
  description: 'Clears the learnset cache from Redis. Can only be used by the bot owner.',
  preconditions: ['OwnerOnly'],
  chatInputCommand: {
    register: true,
    guildIds: getGuildIds(),
    idHints: ['936023506414604318', '942137573348884500'],
    defaultPermission: false
  }
})
export class SlashCommand extends DragoniteCommand {
  public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
    await interaction.deferReply({ ephemeral: true });

    await this.container.gqlRedisCache.clearLearnsetKeys();

    return interaction.editReply({ content: 'Successfully cleared all learnset redis keys' });
  }
}
