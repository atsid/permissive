The tests in this folder are integration tests that require the app to be running at a reachable location as designated in the config.

They will use whatever URLs are generated from the config - I'd recommend running against an app instance that is using the mock services.
This way the GitHub API will not be hit repeatedly and credentials will not be needed.
