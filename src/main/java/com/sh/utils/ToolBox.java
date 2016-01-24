package com.sh.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/**
 * This object holds static utility routines.
 */
public class ToolBox
{
    public ToolBox()
    {
        // to prevent instantiation.
    }

    public static byte[] loadFileIntoMemory( final File file ) throws IOException
    {
        final FileInputStream source = new FileInputStream( file );
        final ByteArrayOutputStream destination = new ByteArrayOutputStream( 2048 );
        try
        {
            copyBufferedStream( source, destination );
            return destination.toByteArray();
        }
        finally
        {
            closeStream( source, destination );
        }

    }

    public static File saveBufferToTemporaryFile( final byte[] buffer ) throws IOException
    {
        final File destination = createTemporaryFile( ".tmp" );
        final InputStream input = new ByteArrayInputStream( buffer );
        final OutputStream output = new FileOutputStream( destination );
        try
        {
            copyBufferedStream( input, output );
        }
        finally
        {
            closeStream( input, output );
        }
        return destination;
    }

    public static void recursiveDelete( final File file )
    {
        if ( file.exists() )
        {
            if( file.isDirectory() )
            {
                deleteFiles( file.listFiles() );
            }
            if( !file.delete() )
            {
                System.err.println( file.getPath() + " was not successfully deleted!" );
            }
        }
        else
        {
            System.err.println( "Not deleting " + file.getPath() + " because it does not exist!" );
        }
    }

    private static void deleteFiles( final File[] files )
    {
        if ( null != files )
        {
            for( final File children : files )
            {
                recursiveDelete( children );
            }
        }
    }

    /**
     * A convenient and efficient way to concatenate a bunch of strings together.
     *
     * @param toAppend an array of strings to concatenate together.
     * @return the concatenated strings.
     */
    public static String concatenate( final String... toAppend )
    {
        final StringBuilder builder = new StringBuilder( 1024 );
        for( final String s : toAppend )
        {
            builder.append( s );
        }
        return builder.toString();
    }

    /**
     * Copies the bytes from the input stream into an in-memory buffer.
     * @param in source of the bytes to copy -- the stream will be closed by this routine.
     * @return copied bytes.
     * @throws java.io.IOException if there is a problem with the copy.
     */
    public static byte[] copyToByteArray( final InputStream in ) throws IOException
    {
        final byte[] buffer;
        if ( null == in )
        {
            buffer = new byte[0];
        }
        else
        {
            final ByteArrayOutputStream out = new ByteArrayOutputStream( 2048 );
            copyStream( in, out );
            buffer = out.toByteArray();
            closeStream( in, out );
        }
        return buffer;
    }

    /**
     * An efficient stream copier that moves bytes from the input stream to the output stream in 4K chunks.  The caller
     * is still responsible for closing the streams.
     *
     * @param in  source of the bytes to copy.
     * @param out destination of the copied bytes.
     * @throws java.io.IOException if there is a problem during the copy.
     */
    public static void copyStream( final InputStream in, final OutputStream out ) throws IOException
    {
        copyStream( in, out, 4 );
    }

    /**
     * An efficient stream copier that moves bytes from the input stream to the output stream.  The caller is responsible
     * for closing the streams.
     * @param in source of the bytes to copy.
     * @param out destination of the bytes.
     * @param blockSize size of the copy buffer in terms of 1K chunks, eg. 1 equates to 1024 and 2 equates to 2048.
     * @throws java.io.IOException if there is a problem with the copy.
     */
    public static void copyStream( final InputStream in, final OutputStream out, final int blockSize ) throws IOException
    {
        final byte[] buffer = new byte[1024 * blockSize];
        while( true )
        {
            final int bytesRead = in.read( buffer );
            if( -1 == bytesRead )
            {
                break;
            }
            out.write( buffer, 0, bytesRead );
        }
    }

    /**
     * An efficient stream copier that wraps the two streams with buffered streams.  Useful in unreliable or bursty
     * streams, like a network or file system.  The default buffer size 2048 bytes.
     * @param in source stream.
     * @param out destination stream.
     * @throws java.io.IOException if there is a problem with the copy.
     */
    public static void copyBufferedStream( final InputStream in, final OutputStream out ) throws IOException
    {

        final int bufferSize = 2048;
        final BufferedInputStream bufferedIn = new BufferedInputStream( in, bufferSize );
        final BufferedOutputStream bufferedOut = new BufferedOutputStream( out, bufferSize );
        while( true )
        {
            final int datum = bufferedIn.read();
            if( -1 == datum )
            {
                break;
            }
            bufferedOut.write( datum );
        }
        /*
        The output stream is deliberately flushed. The data reaches its eventual destination
        in the underlying stream only when the stream is flushed or the buffer fills up.
        Therefore, it’s important to call flush( ) explicitly before the method returns.
        */
        bufferedOut.flush();
    }

    /**
     * Random number generator.
     */
    private static final Random theRandomizer = new Random();

    /**
     * This method returns a random integer between 0 and Integer.MAX_VALUE.
     *
     * @return number between 0 and 2147483647.
     */
    public static int randomPositiveInteger()
    {
        return theRandomizer.nextInt( Integer.MAX_VALUE );
    }

    /**
     * This method creates a string that is the hexadecimal representation of a random integer.
     *
     * @return random hex string.
     */
    public static String randomHexString()
    {
        return Integer.toHexString( randomPositiveInteger() ).toUpperCase( Locale.ENGLISH );
    }

    /**
     * This method creates a random number between 0 and Long.MAX_VALUE.
     *
     * @return number between 0 and really big.
     */
    public static Long randomPositiveLong()
    {
        return Math.abs( theRandomizer.nextLong() );
    }

    /**
     * This method will take a Base64 encoded string and decode it.
     *
     * @param encoded the encoded value.
     * @return the decoded value.
     */
    public static String base64Decode( final String encoded )
    {
        return new String( Base64.decodeBase64(encoded) );
    }

    /**
     * Creates a string suitable for use with HTTP Basic authentication, eg Basic bae4127g.
     *
     * @param username username portion of the credentials.
     * @param password password portion of the credentials.
     * @return authentication string properly formatted for use a HTTP Basic authentication.
     */
    public static String createBasicAuthenticationCredentials( final String username, final String password )
    {
        try
        {
            final String encodedCredentials = Base64.encodeBase64String(ToolBox.concatenate(username, ":", password).getBytes("UTF-8"));
            return ToolBox.concatenate("Basic ", encodedCredentials);
        }
        catch( final UnsupportedEncodingException e )
        {
            throw new IllegalStateException( e );
        }
    }

    /**
     * Create a uniquely named file in the temp directory designated by the Java runtime.
     * @param extension extension to use on the name, eg. .bin or .txt.
     * @return the generated file name.
     */
    public static File createTemporaryFile( final String extension )
    {
        return new File( createTemporaryDirectory(), ToolBox.concatenate(UUID.randomUUID().toString(), extension));
    }

    /**
     * Creates a temporary directory, typically useful in testing.
     *
     * @return handle to the newly created directory.
     */
    public static File createTemporaryDirectory()
    {
        return createTemporaryDirectory( UUID.randomUUID().toString() );
    }

    public static File createTemporaryDirectory( final String directoryName )
    {
        final File temporaryDirectory = new File( System.getProperty( "java.io.tmpdir" ) );
        final File newDirectory = new File( temporaryDirectory, directoryName );
        newDirectory.mkdirs();
        return temporaryDirectory;
    }

    public static void closeStream( final Closeable... stream )
    {
        for( final Closeable closeable : stream )
        {
            if( null != closeable )
            {
                try
                {
                    closeable.close();
                }
                catch( final IOException e )
                {
                    // nothing we can do so eat the exception
                }
            }
        }
    }

    public static String calculateFileName( final String fileNameBase, final String mimeType )
    {
        final String extension = determineFileExtension( mimeType );
        return ToolBox.concatenate(fileNameBase, extension);
    }

    private static String determineFileExtension( final String mimeType )
    {
        return MediaType.fromMimeType(mimeType).getFileExtension();
    }

    /**
     * Convenient cryptographic hash calculator.
     *
     * @param bytes     source to calculate the hash of.
     * @param algorithm hashing algorithm to use, eg. MD5 or SHA-256.
     * @return calculated hash value.
     */
    public static byte[] calculateHash( final byte[] bytes, final String algorithm ) throws NoSuchAlgorithmException
    {
        final MessageDigest digest = MessageDigest.getInstance( algorithm );
        digest.update( bytes );
        return digest.digest();
    }

    public static String calculateMD5Hash( final byte[] bytes ) throws NoSuchAlgorithmException
    {
        final byte[] hash = calculateHash( bytes, "MD5" );
        return DigestUtils.md5Hex(hash);
    }

    /**
     * Convert a string to an enum, of type clazz.
     * @param source the source string to convert.
     * @param clazz the enumeration class.
     * @param <T> the abstract type.
     * @return the converted enumeration value.
     */
    public static <T extends Enum <T>> T convertStringToEnum( final String source, final Class <T> clazz )
    {
        // due to the way the dependencies are structured, we can no longer pull in unique error codes
        final int code = 0;
        try
        {
            return T.valueOf(clazz, source);
        }
        catch( final IllegalArgumentException e )
        {
            final String message = ToolBox.concatenate("'", source, "' is not valid a valid enumeration value.");
            throw new RuntimeException( message, new Throwable());
        }
        catch( final NullPointerException e )
        {
            final String message = "The enumeration type is null.";
            throw new RuntimeException( message, new Throwable());
        }
    }

    /**
     * Utility method, used for building a full URL for logging purposes.
     * @param url the url, containing the query parameters to replace.
     * @param variables the values to insert into the URL.
     * @return the full URL.
     */
    public static String replaceQueryParameters( final String url, final Map<String, String> variables )
    {
        String fullURL = url;
        for ( final Map.Entry<String, String> cursor : variables.entrySet() ) {
            if( cursor.getValue() != null )
            {
                final StringBuilder sb = new StringBuilder();
                sb.append( "{" ).append( cursor.getKey() ).append( "}" );
                fullURL = fullURL.replace( sb.toString(), cursor.getValue() );
            }
        }
        return fullURL;
    }

    /**
     * Convenience method, to search for a given item within a set. This assumes that the equals() method is overridden
     * since this is used to test for item equality.
     * @param targetSet the set to item in.
     * @param item the item to search for.
     * @param <T> the generic type.
     * @return the item if it is found, null otherwise.
     */
    public static <T>T getItemFromSet( final Set<T> targetSet, final T item )
    {
        T result = null;
        for( final T current : targetSet )
        {
            if( current.equals( item ) )
            {
                result = current;
                break;
            }
        }
        return result;
    }

    /**
     * Truncate the source string to the desired length. This method trims the string after truncating as well.
     * @param source the string to truncate.
     * @param length the length to truncate the string to.
     * @return the truncated and trimmed string.
     */
    public static String truncateString( final String source, final int length )
    {
        return source.substring( 0, Math.min( source.length(), length ) ).trim();
    }


    /**
     * Create a temporary file from an input stream.
     * @param source the source stream.
     * @return the temporary file.
     * @throws java.io.IOException if an error occurs.
     */
    public static File createTemporaryFileFromStream( final InputStream source, final String extension ) throws IOException
    {
        final File file = createTemporaryFile( extension );
        final OutputStream destination = new FileOutputStream( file );
        try
        {
            copyBufferedStream( source, destination );
            return file;
        }
        finally
        {
            closeStream( source, destination );
        }
    }
}
