import Image from 'next/image';

/**
 * Wrapper around next/image that disables Vercel's Image Optimization
 * to avoid hitting free tier limits.
 *
 * Use this exactly like next/image - it accepts all the same props.
 */
export default function OptimizedImage(props) {
  return <Image {...props} unoptimized />;
}
