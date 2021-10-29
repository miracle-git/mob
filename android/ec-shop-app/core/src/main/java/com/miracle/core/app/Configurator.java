package com.miracle.core.app;

import java.util.WeakHashMap;

public final class Configurator {
    private static final WeakHashMap<String, Object> CONFIG_MAPS = new WeakHashMap<>();

    private Configurator() {
        CONFIG_MAPS.put(ConfigType.CONFIG_READY.name(), false);
    }

    public static Configurator getInstance() {
        return Holder.INSTANCE;
    }

    final WeakHashMap<String, Object> getConfigMaps() {
        return CONFIG_MAPS;
    }

    private static class Holder {
        private static final Configurator INSTANCE = new Configurator();
    }

    public final void configure() {
        CONFIG_MAPS.put(ConfigType.CONFIG_READY.name(), true);
    }

    public final Configurator withApiHost(String host) {
        CONFIG_MAPS.put(ConfigType.API_HOST.name(), host);
        return this;
    }

    @SuppressWarnings("unchecked")
    private void checkConfiguration() {
        final boolean isReady = (boolean) CONFIG_MAPS.get(ConfigType.CONFIG_READY.name());
        if (!isReady) {
            throw new RuntimeException("Configuration is not ready, call configure() method");
        }
    }

    final <T> T getConfigurations(Enum<ConfigType> key) {
        checkConfiguration();
        return (T) CONFIG_MAPS.get(key.name());
    }
}
