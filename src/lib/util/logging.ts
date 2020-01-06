import {
    LoggerFactoryOptions,
    LFService,
    LogGroupRule,
    LogLevel,
    Logger
} from 'typescript-logging'

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp('model.+'), LogLevel.Debug))
    .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Debug))

export const factory = LFService.createNamedLoggerFactory('LoggerFactory', options)

export const prettyPrint = <T>(t: T): string => JSON.stringify(t, null, 2)

export const logIntermediateResult = <T>(log: Logger, logLevel: LogLevel) => (
    t: T
): T => {
    switch (logLevel) {
        case LogLevel.Trace:
            log.trace(prettyPrint(t))
            break
        case LogLevel.Debug:
            log.debug(prettyPrint(t))
            break
        case LogLevel.Info:
            log.info(prettyPrint(t))
            break
        case LogLevel.Warn:
            log.warn(prettyPrint(t))
            break
        case LogLevel.Error:
            log.error(prettyPrint(t))
            break
        case LogLevel.Fatal:
            log.fatal(prettyPrint(t))
            break
        default:
            break
    }

    return t
}
