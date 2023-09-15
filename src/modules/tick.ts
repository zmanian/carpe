import { get } from 'svelte/store'
import { refreshAccounts } from './accountActions'
import { getTowerChainView, maybeEmitBacklog, maybeStartMiner } from './miner_invoke'
import { getMetadata } from './networks'
import { isInit } from './accounts'
import { Level, logger } from './carpeError'

let tick_in_progress = false

export const carpeTick = async () => {
  if (!tick_in_progress) {
    logger(Level.Info, ' carpeTick')

    // This will check for a network connection
    // If successful this will set the `network.connected` bool to true. And wallet will display a view.
    // will also refresh peer stats looking for good peers.
    // await getMetadata()

    // you should always try to refresh accounts, even on error
    refreshAccounts()

    if (get(isInit)) {
      tick_in_progress = true

      // don't try to connect while we are booting up the app and looking for fullnodes
      // things that need network connectivity e.g. miner happen here
      getMetadata()
        .then(getTowerChainView)
        .then(maybeEmitBacklog)
        .then(maybeStartMiner)
        .finally(() => (tick_in_progress = false))
    }
  }
}
