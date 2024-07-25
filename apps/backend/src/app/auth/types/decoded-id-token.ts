export interface DecodedIdToken {
  aud: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  exp: number;
  firebase: {
    identities: {
      [key: string]: any;
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [key: string]: any;
  };
  /**
   * The ID token's issued-at time, in seconds since the Unix epoch. That is, the
   * time at which this ID token was issued and should start to be considered
   * valid.
   *
   * The Firebase SDKs transparently refresh ID tokens every hour, issuing a new
   * ID token with a new issued-at time. If you want to get the time at which the
   * user session corresponding to the ID token initially occurred, see the
   * [`auth_time`](#auth_time) property.
   */
  iat: number;
  /**
   * The issuer identifier for the issuer of the response.
   *
   * This value is a URL with the format
   * `https://securetoken.google.com/<PROJECT_ID>`, where `<PROJECT_ID>` is the
   * same project ID specified in the [`aud`](#aud) property.
   */
  iss: string;
  /**
   * The phone number of the user to whom the ID token belongs, if available.
   */
  phone_number?: string;
  /**
   * The photo URL for the user to whom the ID token belongs, if available.
   */
  picture?: string;
  /**
   * The `uid` corresponding to the user who the ID token belonged to.
   *
   * As a convenience, this value is copied over to the [`uid`](#uid) property.
   */
  sub: string;
  /**
   * The `uid` corresponding to the user who the ID token belonged to.
   *
   * This value is not actually in the JWT token claims itself. It is added as a
   * convenience, and is set as the value of the [`sub`](#sub) property.
   */
  uid: string;
  /**
   * Other arbitrary claims included in the ID token.
   */
  [key: string]: any;
}
