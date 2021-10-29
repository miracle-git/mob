package com.miracle.ecshop;

import com.miracle.core.activities.ProxyActivity;
import com.miracle.core.delegates.ApplicationDelegate;

public class ECShopActivity extends ProxyActivity {
    @Override
    public ApplicationDelegate setRootDelegate() {
        return new ECShopDelegate();
    }
}