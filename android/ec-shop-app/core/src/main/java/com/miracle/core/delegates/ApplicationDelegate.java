package com.miracle.core.delegates;

import android.os.Bundle;
import android.view.View;

import androidx.annotation.Nullable;

public abstract class ApplicationDelegate extends PermissionCheckerDelegate {
    @Override
    public Object setLayout() {
        return null;
    }

    @Override
    public void onBindView(@Nullable Bundle savedInstanceState, View rootView) {

    }
}
