export interface IBaseConfig {
    moduleId: string;
    isEnable: boolean;
}

export interface IAdvancedConfig extends IBaseConfig {
    permissions: string[];

    readonly lastUpdate: Date;
}

