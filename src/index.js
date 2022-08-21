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

    const major = parsed.groups.MAJOR || ""
    const minor = parsed.groups.MINOR || ""
    const patch = parsed.groups.PATCH || ""
    let prerelease = parsed.groups.PRERELEASE || ""
    let build = parsed.groups.BUILD || ""

    if (prerelease.length > 0) {
        prerelease = prerelease.substring(1)
    }
    if (build.length > 0) {
        build = build.substring(1)
    }

    let outputFn = (name, value) => {
        core.setOutput(name, value)
        core.info(name + ": " + value)
    }

    outputFn("major", major);
    outputFn("minor", minor)
    outputFn("patch", patch)
    outputFn("prerelease", prerelease)
    outputFn("build", build)

    const versionString  = major + "." + minor + "." + patch
    outputFn("version", versionString)
}
catch (err) {
    core.error(err);
}
