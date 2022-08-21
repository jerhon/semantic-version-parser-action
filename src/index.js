const core = require("@actions/core");

try {

    // parse a action input as a semantic version number with a regex
    const version = core.getInput("version", {required: true})
    const defaultVersion = core.getInput("defaultVersion", {required: false})
    const regex = /^v?(?<MAJOR>\d+)\.(?<MINOR>\d+)\.(?<PATCH>\d+)(?<PRERELEASE>-[A-Za-z0-9\-.]+)?(?<BUILD>\+[A-Za-z0-9\-.]+)?$/

    let parsed;
    if (regex.test(version)) {
        core.setOutput("success", true)
        parsed = regex.exec(version)

    } else if (regex.test(defaultVersion)) {
        core.setOutput("success", true)
        parsed = regex.exec(defaultVersion)
    }
    else {
        core.setOutput("success", false)
        return;
    }

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
