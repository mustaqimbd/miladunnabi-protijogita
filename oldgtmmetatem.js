const createQueue = require('createQueue');
const callInWindow = require('callInWindow');
const aliasInWindow = require('aliasInWindow');
const copyFromWindow = require('copyFromWindow');
const setInWindow = require('setInWindow');
const injectScript = require('injectScript');
const makeTableMap = require('makeTableMap');
const makeNumber = require('makeNumber');
const getType = require('getType');
const copyFromDataLayer = require('copyFromDataLayer');
const math = require('Math');
const log = require('logToConsole');
const getUrl = require('getUrl');

const PARAM_BUILDER_SCRIPT_URL = 'https://capi-automation.s3.us-east-2.amazonaws.com/public/client_js/capiParamBuilder/clientParamBuilder.bundle.js';

const initIds = copyFromWindow('_fbq_gtm_ids') || [];
const pixelIds = data.pixelId;
const standardEventNames = ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration', 'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout', 'Lead', 'PageView', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication', 'Subscribe', 'ViewContent'];
const ecommerce = copyFromDataLayer('ecommerce', 1);
const eventModel = copyFromDataLayer('eventModel', 1);

// Helper methods
const fail = msg => {
  log(msg);
  data.gtmOnFailure();
};

const mergeObj = (obj, obj2) => {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj[key] = obj2[key];
    }
  }
  return obj;
};

const parseEecObj = prod => {
  return {
    id: prod.id,
    quantity: prod.quantity
  };
};

// Initialize EEC integration
let eventName, action, eecObjectProps;
if (data.enhancedEcommerce) {
  if (!ecommerce) return fail('Facebook Pixel: No valid "ecommerce" object found in dataLayer');
  if (ecommerce.detail) { eventName = 'ViewContent'; action = 'detail'; }
  else if (ecommerce.add) { eventName = 'AddToCart'; action = 'add'; }
  else if (ecommerce.checkout) { eventName = 'InitiateCheckout'; action = 'checkout'; }
  else if (ecommerce.purchase) { eventName = 'Purchase'; action = 'purchase'; }
  else return fail('Facebook Pixel: Most recently pushed "ecommerce" object must be one of types "detail", "add", "checkout" or "purchase".');

  if (!ecommerce[action].products || getType(ecommerce[action].products) !== 'array') return fail('Facebook pixel: Most recently pushed "ecommerce" object did not have a valid "products" array.');
  eecObjectProps = {
    content_type: 'product',
    contents: ecommerce[action].products.map(parseEecObj),
    value: ecommerce[action].products.reduce((acc, cur) => {
      const curVal = math.round(makeNumber(cur.price || 0) * (cur.quantity || 1) * 100) / 100;
      return acc + curVal;
    }, 0.0),
    currency: ecommerce.currencyCode || 'USD'
  };
  if (['InitiateCheckout', 'Purchase'].indexOf(eventName) > -1) eecObjectProps.num_items = ecommerce[action].products.reduce((acc,cur) => {
    return acc + makeNumber(cur.quantity || 1);
  }, 0);
}

// Prepare event variables
const cidParams = data.advancedMatchingList && data.advancedMatchingList.length ? makeTableMap(data.advancedMatchingList, 'name', 'value') : {};
const objectProps = data.objectPropertyList && data.objectPropertyList.length ? makeTableMap(data.objectPropertyList, 'name', 'value') : {};
const objectPropsFromVar = getType(data.objectPropertiesFromVariable) === 'object' ? data.objectPropertiesFromVariable : {};
let customData = {};

eventName = eventName || (data.eventName === 'custom' ? data.customEventName : (data.eventName === 'variable' ? data.variableEventName : data.standardEventName));

const command = standardEventNames.indexOf(eventName) === -1 ? 'trackSingleCustom' : 'trackSingle';
const consent = data.consent === false ? 'revoke' : 'grant';

// Utility function to use either fbq.queue[]
// (if the FB SDK hasn't loaded yet), or fbq.callMethod()
// if the SDK has loaded.
const getFbq = () => {
  // Return the existing 'fbq' global method if available
  let fbq = copyFromWindow('fbq');
  if (fbq) {
    return fbq;
  }

  // Initialize the 'fbq' global method to either use
  // fbq.callMethod or fbq.queue)
  setInWindow('fbq', function() {
    const callMethod = copyFromWindow('fbq.callMethod.apply');
    if (callMethod) {
      callInWindow('fbq.callMethod.apply', null, arguments);
    } else {
      callInWindow('fbq.queue.push', arguments);
    }
  });
  aliasInWindow('_fbq', 'fbq');

  // Create the fbq.queue
  createQueue('fbq.queue');

  // Return the global 'fbq' method, created above
  return copyFromWindow('fbq');
};

// Get reference to the global method
const fbq = getFbq();

fbq('consent', consent);

 // Set Data Processing Options
if (data.dpoLDU) {
  fbq('dataProcessingOptions', ['LDU'], makeNumber(data.dpoCountry), makeNumber(data.dpoState));
}

// Monitoring agent string for Tag Setup
const agentName = 'tmSimo-GTM-WebTemplate';
const version = '2.0.5';
const agentSuffix = (data.enhancedEcommerce ? '-EEC' : '') + (data.useGA4Ecommerce ? '-GA4' : '');

// Handle multiple, comma-separated pixel IDs,
// and initialize each ID if not done already.
pixelIds.split(',').forEach(pixelId => {
  if (initIds.indexOf(pixelId) === -1) {

    // If the user has chosen to disable automatic configuration
    if (data.disableAutoConfig) {
      fbq('set', 'autoConfig', false, pixelId);
    }

    // If the user has chosen to disable pushState and replaceState tracking
    if (data.disablePushState) {
      setInWindow('fbq.disablePushState', true);
    }


    // Initialize pixel and store in global array
    fbq('init', pixelId, cidParams);

    // Monitoring agent string for Tag Setup
    const agentString = agentName + '-' + version + agentSuffix;
    fbq('set','agent', agentString, pixelId);

    initIds.push(pixelId);
    setInWindow('_fbq_gtm_ids', initIds, true);

    // If this first-time init included cidParams, mark the page as
    // already-initialized-with-cidParams so we never re-init for it.
    if (data.advancedMatchingList && data.advancedMatchingList.length) {
      setInWindow('_fbq_gtm_cidparams_initialized', true, true);
    }
  }
});

// Re-init pixels with cidParams when:
//   - this tag fire actually has Advanced Matching data, AND
//   - we have NOT yet initialized any pixel with cidParams on this page.
if (data.advancedMatchingList && data.advancedMatchingList.length) {
  const cidParamsInitialized = copyFromWindow('_fbq_gtm_cidparams_initialized') === true;
  if (!cidParamsInitialized) {
    setInWindow('_fbq_gtm_cidparams_initialized', true, true);

    const firstPixelId = pixelIds.split(',')[0];
    callInWindow(
      'fbq',
      'gateCheck',
      'enable_reinit_cidparams2',
      function(gateName, pixelID) {
        pixelIds.split(',').forEach(pixelId => {
          if (initIds.indexOf(pixelId) !== -1) {
            fbq('init', pixelId, cidParams);
            const reinitAgentString = agentName + '-' + version + agentSuffix + '-REINIT';
            fbq('set', 'agent', reinitAgentString, pixelId);
          }
        });
      },
      function(gateName, pixelID) {},
      firstPixelId
    );
  }
}

const fireEvent = (resolvedCustomData) => {
  const mergedCustom = mergeObj(resolvedCustomData, eecObjectProps || {});
  const mergedObjectProps = mergeObj(objectPropsFromVar, objectProps);
  const finalObjectProps = mergeObj(mergedCustom, mergedObjectProps);

  pixelIds.split(',').forEach(pixelId => {
    if (data.eventId) {
      fbq(command, pixelId, eventName, finalObjectProps, {eventID: data.eventId});
    } else {
      fbq(command, pixelId, eventName, finalObjectProps);
    }
  });
};

if (data.useGA4Ecommerce) {
  const firstPixelId = pixelIds.split(',')[0];
  callInWindow(
    'fbq',
    'gateCheck',
    'enable_gtm_ga4_structure',
    function(gateName, pixelID) {
      // Set user_data from eventModel into cidParams
      if (eventModel && eventModel.user_data) {
        var ud = eventModel.user_data;
        if (ud.email_address && !cidParams.em) cidParams.em = ud.email_address;
        if (ud.phone_number && !cidParams.ph) cidParams.ph = ud.phone_number;
        if (ud.address) {
          if (ud.address.first_name && !cidParams.fn) cidParams.fn = ud.address.first_name;
          if (ud.address.last_name && !cidParams.ln) cidParams.ln = ud.address.last_name;
          if (ud.address.city && !cidParams.ct) cidParams.ct = ud.address.city;
          if (ud.address.region && !cidParams.st) cidParams.st = ud.address.region;
          if (ud.address.postal_code && !cidParams.zp) cidParams.zp = ud.address.postal_code;
          if (ud.address.country && !cidParams.country) cidParams.country = ud.address.country;
        }
        if (ud.fb_login_id && !cidParams.fb_login_id) cidParams.fb_login_id = ud.fb_login_id;

        pixelIds.split(',').forEach(function(pixelId) {
          fbq('init', pixelId, cidParams);
        });
      }

      // Set custom_data from eventModel
      if (eventModel) {
        if (eventModel.currency) customData.currency = eventModel.currency;
        if (eventModel.value) customData.value = eventModel.value;
        if (eventModel.search_term) customData.search_string = eventModel.search_term;
        if (eventModel.transaction_id) customData.order_id = eventModel.transaction_id;
        if (eventModel.items && getType(eventModel.items) === 'array') {
          customData.contents = eventModel.items.map(function(item) {
            return {
              id: (item.item_id || item.item_name) || undefined,
              item_price: item.price || undefined,
              quantity: item.quantity || undefined
            };
          });
        }
      }

      fireEvent(customData);
    },
    function(gateName, pixelID) {
      fireEvent(customData);
    },
    firstPixelId
  );
} else {
  fireEvent(customData);
}

// Inject Param Builder script if enabled
const onParamBuilderFailure = () => {
  log('Facebook Pixel: Failed to load clientParamBuilder script');
};

// Param Builder callback - called after script loads
const processAndCollectAllParams = () => {
  log("ParamBuilder script loaded successfully, processing and collecting all params...");
  const clientParamBuilder = copyFromWindow('clientParamBuilder');
  if (!clientParamBuilder) {
    log("ERROR: clientParamBuilder wasn't loaded correctly.");
    return;
  }

  const currentPageUrl = getUrl();

  // Check which method exists and call it via callInWindow
  const hasProcessAndCollectAllParams = copyFromWindow('clientParamBuilder.processAndCollectAllParams');
  const hasProcessAndCollectParams = copyFromWindow('clientParamBuilder.processAndCollectParams');

  if (hasProcessAndCollectAllParams) {
    callInWindow('clientParamBuilder.processAndCollectAllParams', currentPageUrl);
    log("processAndCollectAllParams completed successfully.");
    setInWindow('_fbq_param_builder_status', 'complete', true);
    data.gtmOnSuccess();
  } else if (hasProcessAndCollectParams) {
    callInWindow('clientParamBuilder.processAndCollectParams', currentPageUrl);
    log("processAndCollectParams completed successfully.");
    setInWindow('_fbq_param_builder_status', 'complete', true);
    data.gtmOnSuccess();
  } else {
    log("ERROR: Neither processAndCollectAllParams nor processAndCollectParams methods found.");
    data.gtmOnFailure();
  }
};


function gtmSuccess() {
  const status = copyFromWindow('_fbq_param_builder_status');

  // If it's done OR currently downloading, skip injecting it again!
  if (status === 'complete' || status === 'loading') {
    return data.gtmOnSuccess();
  }

  // Immediately lock the state synchronously so Tag 2 doesn't enter this block
  setInWindow('_fbq_param_builder_status', 'loading', true);

  var firstPixelId = pixelIds.split(',')[0];

  callInWindow(
    'fbq',
    'gateCheck',
    'enable_gtm_parambuilder',
    function(gateName, pixelID) {
      injectScript(PARAM_BUILDER_SCRIPT_URL, processAndCollectAllParams, onParamBuilderFailure, PARAM_BUILDER_SCRIPT_URL);
    },
    function(gateName, pixelID) {
      data.gtmOnSuccess();
    },
    firstPixelId
  );
}

// Use the URL as the cache token (matches original paramBuilder template)

injectScript('https://connect.facebook.net/en_US/fbevents.js', gtmSuccess, data.gtmOnFailure, 'fbPixel');