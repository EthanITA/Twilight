import { Editor } from "@tiptap/vue-3";

export { AutocompleteExtension } from "~/const/editor/extensions/autocomplete";

const names = {
  SUGGESTION: "suggestion",
};

export default names;

export type ExtensionName = (typeof names)[keyof typeof names] | string;
export const getExtensions = (editor: Editor, name: ExtensionName) => {
  return editor.extensionManager.extensions.find(
    (extension) => extension.name === name,
  );
};
