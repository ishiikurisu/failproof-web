(ns failproof-server.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[failproof-server started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[failproof-server has shut down successfully]=-"))
   :middleware identity})
