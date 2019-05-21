export class Globals {
    public static get APP_NAME(): string { return 'Fenrir Studio'; }
    public static get APP_TAB_TITLE(): string { return this.APP_NAME; }
    public static get APP_TAB_SEPERATOR(): string { return ' . '; }
    public static get APP_API(): string { return 'http://api.connexion.fr/'; }
    public static get APP_USER_TOKEN(): string { return 'id-token'; }
    public static get APP_USER(): string { return 'data-user'; }
    public static get APP_FORMATION(): string { return this.APP_API + 'formation'; }
}
