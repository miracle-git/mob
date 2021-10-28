package com.miracle.ecshop;

import android.app.Application;

import com.miracle.core.app.ApplicationContext;

public class ECShopApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        ApplicationContext.init(this).withApiHost("http://127.0.0.1").configure();
    }
}
