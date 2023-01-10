const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
import { Adw } from 'imports/gi';
import { addCombo, addTextEntry, addNumberEntry } from 'preferences/common';

export const fontWeightOptions = {
    lighter: 'Lighter',
    normal: 'Normal',
    bolder: 'Bolder',
    bold: 'Bold',
};

export class AppearancePage {
    window!: Adw.PreferencesWindow;
    readonly page = new Adw.PreferencesPage();
    private readonly _settings = ExtensionUtils.getSettings(
        `${Me.metadata['settings-schema']}.appearance`,
    );

    init() {
        this.page.set_title('Appearance');
        this.page.set_icon_name('preferences-system-symbolic');
        this._initActiveWorkspaceGroup();
    }

    private _initActiveWorkspaceGroup(): void {
        const group = new Adw.PreferencesGroup();
        group.set_title('Active Workspace');
        addTextEntry({
            settings: this._settings,
            group,
            key: 'active-workspace-color',
            title: 'Active workspace color',
        });
        addCombo({
            window: this.window,
            settings: this._settings,
            group,
            key: 'active-workspace-font-weight',
            title: 'Font weight of active workspace',
            options: fontWeightOptions,
        });
        addNumberEntry({
            settings: this._settings,
            group,
            key: 'active-workspace-radius',
            title: 'Active workspace border radius',
        });
        this.page.add(group);
    }
}
