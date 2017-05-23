(ns user
  (:require [mount.core :as mount]
            failproof-server.core))

(defn start []
  (mount/start-without #'failproof-server.core/repl-server))

(defn stop []
  (mount/stop-except #'failproof-server.core/repl-server))

(defn restart []
  (stop)
  (start))


