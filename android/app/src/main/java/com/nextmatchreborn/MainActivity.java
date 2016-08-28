package com.nextmatchreborn;

import com.facebook.react.ReactActivity;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.realm.react.RealmReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.auth0.lock.react.LockReactPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "NextMatchReborn";
    }
}
