import { combineReducers } from "@reduxjs/toolkit";
import { clientRegistrationForm } from "./forms";
import { simpleSearchForm } from "./forms/simpleSearchForm";
import { advancedSearchForm } from "./forms/advancedSearchForm";
import { user } from "./user";
import proposition from "./proposition";
import { propositionType } from "./proposition/proposition-type";
import { situation } from "./proposition/situation";
import propositionFolder from "./proposition/proposition-folder";
import folder from "./folder";
import house from "./house";
import technicalNote from "./nota-tecnica";
import tramitacao from "./tramitacao";
import search from "./search";
import searchResult from "./search-result";
import notification from "./notification";
import { clientFolderModal } from "./clientFolderModal";
import { clientFolderDeleteModal } from './clientFolderDeleteModal/index'

const rootReducer = combineReducers({
  clientFolderModal,
  clientFolderDeleteModal,
  user,
  simpleSearchForm,
  advancedSearchForm,
  clientRegistrationForm,
  proposition,
  propositionFolder,
  propositionType,
  situation,
  folder,
  house,
  search,
  searchResult,
  technicalNote,
  tramitacao,
  notification,
});

export default rootReducer;
