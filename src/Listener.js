class Listener {
    constructor(playlistServices, mailSender) {
      this._playlistServices = playlistServices;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { id, targetEmail } = JSON.parse(message.content.toString());
        console.log(JSON.parse(message.content.toString()))
        const playlist = await this._playlistServices.getSongsFromPlaylist(id);
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;