import * as core from '@actions/core'
import { join } from 'path'
import { exec, sed } from 'shelljs'
import { getGitRoot, getLatestName } from './utils'

/**
 * Update the repo's dockerfiles with the current cache file.
 *
 * @param cacheRepo [smartcontract/cache] The dockerhub repository of the cache image
 */
export async function updateDockerfiles(cacheRepo = 'smartcontract/cache') {
  const { latestName } = await getLatestName(cacheRepo)
  const files = getDockerFiles(cacheRepo)

  files.forEach(({ path, text }) => {
    core.info(`Updating dockerfile ${path} from ${text} to ${latestName}`)
    sed('-i', text, `FROM ${latestName}`, [join(getGitRoot(), path)])
  })
}

/**
 * Split a string based on the first occurence of a colon
 *
 * @param s The string to split on
 */
export function splitOnColon(s: string) {
  const i = s.indexOf(':')

  return i < 0 ? [s] : [s.substring(0, i), s.substring(i + 1)]
}

/**
 * Get a list of dockerfiles that are used as cache images
 * within this repository.
 */
function getDockerFiles(cacheFileName: string) {
  const res = exec(`git grep "${cacheFileName}" -- "*Dockerfile*"`, {
    cwd: getGitRoot(),
  })

  return res
    .split('\n')
    .filter(Boolean)
    .map(splitOnColon)
    .map(([path, text]) => ({ path, text }))
}
