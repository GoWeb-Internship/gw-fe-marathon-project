import CMS from 'netlify-cms-app';
import { IdControl, CustomWidgetPreview } from '../utils/customWidget';

CMS.registerWidget('id', IdControl, CustomWidgetPreview);
