<script>
  import { onMount } from "svelte";
  import { getVersion, app_version } from "../../version";
  import { _ } from "svelte-i18n";
  import {
    checkUpdate,
  } from '@tauri-apps/api/updater'

  let release = {};

  onMount(async () => {
    getVersion();
    app_version.subscribe(v => release = v)
  });

  const tryUpdate = async () => {
    checkUpdate().
    then(r => console.log(r))
  }

</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("about.about")}</h2>
  </div>
  <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
    <h3 class="uk-card-title uk-text-muted">{$_("about.release")}</h3>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.version")}: </span>v{release.version}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.commit")}: </span>{release.hash}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.branch")}: </span>{release.head}
    </p>

  </div>
  <div>
    <button on:click={tryUpdate} class="uk-button uk-button-default">Update</button>
  </div>
</main>