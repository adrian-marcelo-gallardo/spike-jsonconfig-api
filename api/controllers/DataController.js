/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  async fetchHistory(req, res) {
    const id = req.param('id')
    const config = await ConfigSnapshot.find({
      where: {
        config: id 
      },
      sort: 'id DESC'
    })

    if (!config) {
      return res.status(404, 'Not Found')
    }

    const snapshots = await ConfigSnapshot.find({
      where: {
        config: config.id
      },
      sort: 'id DESC'
    }) || []

    if (!snapshots || snapshots.length === 0) {
      return res.status(404, 'Not Found')
    }

    if (!version) {
      res.status(200).json(snapshots[0])
    } else {
      const snapshot = snapshots.find(currentSnapshot => semver.satisfies(currentSnapshot.version, version))
      res.status(200).json(snapshot)
    }
  }
};

