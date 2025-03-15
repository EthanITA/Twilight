import { Node } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "@tiptap/pm/view";
import type { RawCommands } from "@tiptap/vue-3";
import extensions from "~/const/editor/extensions/index";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    AutocompleteExtension: {
      setSuggestion: (suggestion: string) => ReturnType;
      applySuggestion: () => ReturnType;
      clearSuggestion: () => ReturnType;
    };
  }
}

const pluginKey = new PluginKey<DecorationSet>(extensions.SUGGESTION);

export const AutocompleteExtension = Node.create<
  undefined,
  {
    currentSuggestion?: string;
  }
>({
  name: extensions.SUGGESTION,

  addStorage() {
    return { currentSuggestion: undefined };
  },

  getSuggestion() {
    return this.storage.currentSuggestion;
  },

  addCommands() {
    return {
      setSuggestion:
        (suggestion: string) =>
        ({ state, dispatch }: any) => {
          if (!suggestion) return false;
          // Save the suggestion in storage.
          this.storage.currentSuggestion = suggestion;

          const selection = state.selection;
          const cursorPos = selection.$head.pos;
          const nextNode = state.doc.nodeAt(cursorPos);

          const suggestionDecoration = Decoration.widget(
            cursorPos,
            () => {
              const parentNode = document.createElement("span");
              const addSpace = nextNode && nextNode.isText ? " " : "";
              parentNode.innerHTML = `${addSpace}${suggestion}`;
              parentNode.classList.add("autocomplete-suggestion");
              return parentNode;
            },
            { side: 1 },
          );

          const decorations = DecorationSet.create(state.doc, [
            suggestionDecoration,
          ]);
          const tr = state.tr;
          tr.setMeta("addToHistory", false);
          tr.setMeta(pluginKey, { decorations });
          dispatch(tr);
          return true;
        },

      // Command to apply the current suggestion.
      applySuggestion:
        () =>
        ({ state, dispatch }: any) => {
          const suggestion = this.storage.currentSuggestion;
          if (!suggestion) return false;
          const { $from } = state.selection;
          const tr = state.tr.insertText(suggestion, $from.pos);
          // Clear the suggestion after applying.
          this.storage.currentSuggestion = undefined;
          dispatch(tr);
          return true;
        },

      // Command to clear the current suggestion.
      clearSuggestion:
        () =>
        ({ state, dispatch }: any) => {
          this.storage.currentSuggestion = undefined;
          const tr = state.tr;
          tr.setMeta("addToHistory", false);
          tr.setMeta(pluginKey, { decorations: DecorationSet.empty });
          dispatch(tr);
          return true;
        },
    } as Partial<RawCommands>;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, oldValue) {
            if (tr.getMeta(pluginKey)) {
              // Update the decoration state based on our meta.
              const { decorations } = tr.getMeta(pluginKey);
              return decorations;
            }
            return tr.docChanged ? oldValue.map(tr.mapping, tr.doc) : oldValue;
          },
        },
        view: () => ({
          update(view, prevState) {
            const selection = view.state.selection;
            const cursorPos = selection.$head.pos;
            const nextNode = view.state.doc.nodeAt(cursorPos);

            // If the cursor isn’t at the end of the block and we have a suggestion,
            // clear the decoration.
            if (
              nextNode &&
              !nextNode.isBlock &&
              pluginKey.getState(view.state)?.find().length
            ) {
              const tr = view.state.tr;
              tr.setMeta("addToHistory", false);
              tr.setMeta(pluginKey, { decorations: DecorationSet.empty });
              view.dispatch(tr);
              return;
            }

            if (prevState && prevState.doc.eq(view.state.doc)) {
              return;
            }

            // Clear the suggestion decoration when the document changes.
            setTimeout(() => {
              const tr = view.state.tr;
              tr.setMeta("addToHistory", false);
              tr.setMeta(pluginKey, { decorations: DecorationSet.empty });
              view.dispatch(tr);
            }, 0);
          },
        }),
        props: {
          decorations(editorState) {
            return pluginKey.getState(editorState);
          },
        },
      }),
    ];
  },
});
