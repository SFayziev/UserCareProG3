package usercareproj

import com.sh.db.map.ProjectDTO
import groovy.transform.CompileStatic
import groovy.xml.MarkupBuilder
import org.grails.plugins.web.taglib.FormatTagLib
import org.grails.taglib.GroovyPageAttributes
import org.springframework.web.servlet.support.RequestContextUtils

import  org.grails.encoder.CodecLookup
import  org.grails.encoder.Encoder
import org.springframework.context.MessageSource

/**
 *
 */

class LocaleTagLib {
    static defaultEncodeAs = [taglib:'text']
//    static encodeAsForTags = [tagName: [taglib:'html'], otherTagName: [taglib:'none']]
    static namespace = 'locale'

    static returnObjectForTags = ['message', 'fieldError', 'formatValue']

    MessageSource messageSource
    def webServicesSession

    CodecLookup codecLookup

    List<Locale> locales = [Locale.GERMAN, Locale.ENGLISH]

    /**
     * Renders a locale selector.
     * Adds the class <code>active</code> to the list-element of the current language.
     */
    def selector = {
        Locale requestLocale = RequestContextUtils.getLocale(request)

        MarkupBuilder mb = new MarkupBuilder(out)
        mb.ul('id': 'locale-selector') {
            locales.each { Locale locale ->
                li(requestLocale.language == locale.language ? ['class': 'active'] : [:]) {
                    mb.yield(
                            link( controller: controllerName, action: actionName, params: params + [lang: locale.language],
                                    { locale.getDisplayLanguage(locale) } ) .toString(),
                            false
                    )
                }
            }
        }
    }


    Closure message = { attrs ->
        messageImpl(attrs)
    }

    @CompileStatic
    def messageImpl(Map attrs) {
        Locale locale =  FormatTagLib.resolveLocale(attrs.locale)
        def tagSyntaxCall = (attrs instanceof GroovyPageAttributes) ? attrs.isGspTagSyntaxCall() : false
        def project=attrs.proj as ProjectDTO
        def text
        if (attrs.code) {
            String code = attrs.code?.toString()
            List args = []
            if (attrs.args) {
                args = attrs.encodeAs ? attrs.args as List : encodeArgsIfRequired(attrs.args)
            }
            String defaultMessage
            if (attrs.containsKey('default')) {
                defaultMessage = attrs['default']?.toString()
            } else {
                defaultMessage = code
            }
            def message= project ? project.getMessage(code, args == null ? null : args.toArray(),  defaultMessage, locale) : null;

             message =(message== null)? messageSource.getMessage(code, args == null ? null : args.toArray(),
                    defaultMessage, locale):message;
            if (message != null && message!='') {
                text = message
            }
            else {
                text = defaultMessage
            }
        }
        if (text) {
            Encoder encoder = codecLookup.lookupEncoder(attrs.encodeAs?.toString() ?: 'raw')
            return encoder  ? encoder.encode(text) : text
        }
        ''
    }

    @CompileStatic
    private List encodeArgsIfRequired(arguments) {
        arguments.collect { value ->
            if (value == null || value instanceof Number || value instanceof Date) {
                value
            } else {
                Encoder encoder = codecLookup.lookupEncoder('HTML')
                encoder ? encoder.encode(value) : value
            }
        }
    }
}
