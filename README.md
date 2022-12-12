
# WePublish Analytics Plugin

## Overview 

This is an analytics plugin for WePublish. It includes basic configuration and lets you send some tracking information to WePublish's Matomo. Under the hood, it utilises `@jonkoops/matomo-tracker` for easier integration.

## Prerequisities

This is a plugin for analytics.js which is required to be installed in your app.
https://github.com/DavidWells/analytics

## Installation

`yarn add @wepublish/analytics`
or
`npm install @wepublish/analytics`

## Usage

Import and initialise the tracker anywhere in the project

    import  Analytics  from  'analytics'
    import { matomoPlugin } from '@wepublish/analytics'
    
    const  analytics = Analytics({
	    app: 'Your app name',
	    plugins: [matomoPlugin()]
    })

then call the method on page load e.g.

    const { current } = useRoute()
    
    useEffect(() => {
    	analytics.page()
    }, [current])

The tracker will automatically look in the html structure for an element with an id "peer-element" and take data from this element. Example element to send peer tracking data should look like the following:

    <div id="peer-element" data-peer-name="Some peer name" data-peer-article-id="123" data-publisher-name="Your name" />

If you want to track page views and send peer name and peer article id, please make sure that this element is present on the peered article page. Otherwise the tracker won't be called.

##  Methods

The package exposes one method that can be called in order to call the tracker - `page()`. 
Page method is meant to be called on page view. More methods are to be added in the future.

## References
https://github.com/jonkoops/matomo-tracker/tree/main/packages/js
https://github.com/DavidWells/analytics