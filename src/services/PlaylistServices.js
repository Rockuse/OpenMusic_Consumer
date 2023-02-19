const { Pool } = require('pg');
const NotFoundError = require('../utils/exceptions/NotFoundError');
const { mapPlaylist } = require('../utils/mapDbModel');

class Playlists {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(id) {
    const query = {
      text: 'Select c.*,b.playlist_id,a.name,d.username from playlists a '
      + 'inner join playlist_songs b on a.id=b.playlist_id '
      + 'inner join songs c on c.id=b.song_id '
      + 'inner join users d on d.id= a.owner '
      + 'where a.id=$1',
      values: [id],
    };
    // console.log(query)
    const results = await this._pool.query(query);
    if (!results.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan tidak ditemukan');
    }
    return mapPlaylist(results.rows);
  }
}

module.exports = Playlists;
