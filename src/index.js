const core = require("@actions/core");
const github = require("@actions/github")


try {

    // parse a action input as a semantic version number with a regex
    const version = core.getInput("version", {required: true})
    const regex = /^v?(?<MAJOR>\d+)\.(?<MINOR>\d+)\.(?<PATCH>\d+)(?<PRERELEASE>-[A-Za-z0-9\-.]+)?(?<BUILD>\+[A-Za-z0-9\-.]+)?$/
    if (!regex.test(version)) {
        core.setOutput("success", false)
    }

    core.setOutput("success", true)

    const parsed = regex.exec(version)

    const major = parsed.groups.MAJOR
    const minor = parsed.groups.MINOR
    const patch = parsed.groups.PATCH
    let prerelease = parsed.groups.PRERELEASE
    let build = parsed.groups.BUILD

    if (major) {
        core.setOutput("major", major)
        core.info("major: " + major)
    }
    if (minor) {
        core.setOutput("minor", minor)
        core.info("minor: " + minor)
    }
    if (patch) {
        core.setOutput("patch", patch)
        core.info("patch: " + patch)
    }
    if (prerelease) {
        prerelease = prerelease.substring(1)
        core.setOutput("prerelease", prerelease)
        core.info("prerelease: " + prerelease)
    }
    if (parsed.groups.BUILD) {
        build = build.substring(1)
        core.setOutput("build", build)
        core.info("build: " + build)
    }

    core.setOutput("version", major + "." + minor + "." + patch)

}
catch (err) {
    core.error(err);
}
